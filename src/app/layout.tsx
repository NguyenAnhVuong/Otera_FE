"use client";
import { authApi } from "@/api/authApi";
import AntdProvider from "@/lib/AntdProvider";
import { store } from "@/rtk/store";
import { validateJwtToken } from "@/utils/jwt";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ConfigProvider } from "antd";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";
import NoData from "@/components/Atoms/NoData";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import Header from "@/components/Organisms/Header";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const getAuthHeader = async () => {
  let token = localStorage.getItem("accessToken");
  if (token) {
    const verifyToken = validateJwtToken(token);
    if (!verifyToken) {
      const { data } = await authApi.refreshToken();

      if (data) {
        const { accessToken } = data;
        localStorage.setItem("accessToken", accessToken);
        token = accessToken;
      } else {
        localStorage.removeItem("accessToken");
        // remove cookie
        document.cookie =
          "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    }
  }
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
};

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_API_URL,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_HASURA_WS_URL as string,
    connectionParams: getAuthHeader,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = JWTManager.getToken();
  const authHeader = await getAuthHeader();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...authHeader.headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#FEDB39",
              },
            }}
            renderEmpty={() => <NoData />}
          >
            <AntdProvider>
              <html lang="en">
                <body className={inter.className}>
                  <Header />
                  <div className="flex justify-center w-full py-header min-h-screen text-black">
                    <div className="max-w-[1200px] w-full">{children}</div>
                  </div>
                </body>
              </html>
            </AntdProvider>
          </ConfigProvider>
        </AntdRegistry>
      </ApolloProvider>
    </Provider>
  );
}
