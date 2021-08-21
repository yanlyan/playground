import { useRouter } from "next/router";

export default function ChallengeDetail() {
  const router = useRouter();
  const { id } = router.query;
  return <div className="col-5">Lorem {id}</div>;
}
