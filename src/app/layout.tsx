"use client";
import Header from "@/components/layout/Header";
import AntdProvider from "@/lib/AntdProvider";
import { store } from "@/rtk/store";
import { validateJwtToken } from "@/utils/jwt";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ConfigProvider } from "antd";
import axios from "axios";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";
import { authApi } from "@/api/authApi";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_API_URL,
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token = localStorage.getItem("accessToken");

  if (token) {
    const verifyToken = validateJwtToken(token);
    if (!verifyToken) {
      const { data } = await authApi.refreshToken();
      if (data) {
        const { accessToken } = data;
        localStorage.setItem("accessToken", accessToken);
        token = accessToken;
      }
    }
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#FEDB39",
            },
          }}
        >
          <AntdProvider>
            <html lang="en">
              <body className={inter.className}>
                <Header />
                <div className="flex justify-center w-full">
                  <div className="max-w-[1200px] w-full">{children}</div>
                </div>
              </body>
            </html>
          </AntdProvider>
        </ConfigProvider>
      </Provider>
    </ApolloProvider>
  );
}
