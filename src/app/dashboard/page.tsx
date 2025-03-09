import { dbConnection } from "@/lib/database/connection";

export default async function Dashbord() {
  console.log("before query");
  const res = await dbConnection.selectFrom("user").selectAll().execute();
  console.log("after query", res);

  return <div>Dashboard</div>;
}
