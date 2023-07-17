import { Header } from "@/components/header/header";
import { Title } from "@/components/ui/title";
import Image from "next/image";

export default async function Home() {

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-16">
        <div className="flex flex-col justify-center items-center">
          <Title type="h1">The Expanse</Title>
          <Title type="h2">Alala's Keening</Title>
        </div>
        <div className="my-12">
          <Image src="https://res.cloudinary.com/diahnvqxo/image/upload/v1688716364/Zephyr_i67hlf.jpg" alt="The Zephyr" width={1200} height={601} />
        </div>
      </main>
    </>
  )
}
