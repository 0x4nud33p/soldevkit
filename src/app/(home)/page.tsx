import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link href="/docs/introduction">
        <h1>Docs</h1>
      </Link>
    </div>
  );
}
