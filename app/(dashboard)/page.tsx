import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div>
      <h1>This is an authenticated page.</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
