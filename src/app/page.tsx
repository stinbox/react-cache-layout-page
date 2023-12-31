import { getNowAsync } from "@/lib/getNowAsync";
import Link from "next/link";

const Page = async () => {
  const timestamp = await getNowAsync();

  return (
    <div className="bg-red-100 font-bold p-4">
      <div>Page1: {timestamp}</div>
      <Link className="text-blue-400 underline" href="/page2">
        go to Page2
      </Link>
    </div>
  );
};

export default Page;
export const dynamic = "force-dynamic";
