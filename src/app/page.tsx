import Wrapper from "@/components/Questions";
import useQuestionStore from "@/state/useQuestionStore";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Wrapper />
    </main>
  );
}
