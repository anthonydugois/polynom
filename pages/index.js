import dynamic from "next/dynamic";
import { default as Layout } from "../ui/Layout";

const Workspace = dynamic(import("../components/Workspace"), { ssr: false });

export default () => (
  <Layout>
    <Workspace />
  </Layout>
);
