// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Hero} from "@/app/(home)/components/Hero";
import {CardEntry} from "@/app/(home)/components/CardForm/CardEntry";
import { CardDisplayBoard } from "./components/CardDisplay/CardDisplayBoard";

export default function Home() {
  return (
    <main className="pt-16">
      {/* <Hero /> */}
      <CardEntry />
      <CardDisplayBoard />
    </main>
  );
}
