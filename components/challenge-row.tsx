import { IChallenge } from "../interfaces/IChallenge";
import { Badge, Button } from "react-bootstrap";
import router from "next/router";

export default function ChallengeRow({ challenge }: { challenge: IChallenge }) {
  let gradingStatus = null;
  switch (challenge.gradingStatus) {
    case "UNSUBMITTED":
      gradingStatus = <Badge bg="secondary">{challenge.gradingStatus}</Badge>;
      break;
    case "SUBMITTED":
      gradingStatus = <Badge bg="info">{challenge.gradingStatus}</Badge>;
      break;
    case "GRADE_PASSED":
      gradingStatus = <Badge bg="success">PASSED</Badge>;
      break;
    case "GRADE_FAILED":
      gradingStatus = <Badge bg="danger">FAILED</Badge>;
      break;

    default:
      break;
  }

  let grade = null;
  if (challenge.grade) {
    grade = challenge.grade;
  } else {
    grade = (
      <Button
        size="sm"
        variant="success"
        onClick={() => router.push(`/challenges/${challenge.id}/grade/`)}
        disabled={challenge.gradingStatus !== "SUBMITTED"}
      >
        Set Grade
      </Button>
    );
  }

  let reviewerName = null;

  if (challenge.reviewer) {
    reviewerName = challenge.reviewer.name;
  } else {
    reviewerName = (
      <Button
        size="sm"
        disabled={challenge.gradingStatus !== "SUBMITTED"}
        onClick={() => router.push(`/challenges/${challenge.id}/assign/`)}
      >
        Assign
      </Button>
    );
  }

  return (
    <tr key={challenge.id}>
      <td className="text-center">{challenge.index}</td>
      <td>{challenge.name}</td>
      <td>{challenge.student.name}</td>
      <td className="text-center">{gradingStatus}</td>
      <td className="text-center">{grade}</td>
      <td className="text-center">{reviewerName}</td>
    </tr>
  );
}
