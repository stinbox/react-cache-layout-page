import { getNowAsync } from "@/lib/getNowAsync";
import Link from "next/link";

const Page = async () => {
  const timestamp = await getNowAsync();

  return (
    <div className="bg-green-100 font-bold p-4">
      <div>Page2: {timestamp}</div>
      <Link className="text-blue-400 underline" href="/">
        go to Page1
      </Link>
    </div>
  );
};

export default Page;
export const dynamic = "force-dynamic";
