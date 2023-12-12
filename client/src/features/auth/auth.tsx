import { Flex, Spin } from "antd";
import { useCurrentQuery } from "../../app/serivices/auth";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return (
      <Flex
      align="center"
      justify="center"
      style={{ height: "100vh", width: "100%" }}
    >
      <Spin size="large" />
    </Flex>
    );
  }

  return children
}
