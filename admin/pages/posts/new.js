import dynamic from "next/dynamic";
import marked from "marked";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export default function () {
  return <MdEditor style={{ height: "500px" }} renderHTML={marked} />;
}
