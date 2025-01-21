// import Image from "next/image";
// import styles from "./page.module.css";
import AuthInputs from "@/component/AuthInputs";
import Header from "@/component/Header";
import "./index.css";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <AuthInputs />
      </main>
    </>
  );
}
