import { redirect } from "next/navigation";

export default function Home() {
  redirect('/dashboard');
  return (
   <div>
    <h1>dashboard</h1>
   </div>
  );
}
