import { EStatus } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";

const useGetStatusText = () => {
  const { localeText } = useTrans();
  const getStatusText = (status?: EStatus) => {
    switch (status) {
      case EStatus.Rejected:
        return localeText.deathAnniversary.reject;
      case EStatus.Approved:
        return localeText.deathAnniversary.approve;
      default:
        return localeText.deathAnniversary.pending;
    }
  };
  return getStatusText;
};

export default useGetStatusText;
