import getConfig from "next/config";
import { IChallenge } from "../../interfaces/IChallenge";
export default function Challenges({
  challenges,
}: {
  challenges: IChallenge[];
}) {
  const rows = challenges.map((c) => {
    return (
      <tr key={c.id}>
        <td>1</td>
        <td>{c.name}</td>
        <td>{c.gradingStatus}</td>
        <td>{c.grade}</td>
      </tr>
    );
  });
  return (
    <div className="container">
      <h1>Challenges</h1>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Grading Status</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

Challenges.getInitialProps = async (ctx) => {
  const { serverRuntimeConfig } = getConfig();
  const res = await fetch(`${serverRuntimeConfig.API_URL}/api/challenges`);
  return {
    challenges: await res.json(),
  };
};
