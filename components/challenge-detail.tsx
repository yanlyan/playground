import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useRouter } from "next/router";
import { Card, Badge } from "react-bootstrap";
import { IChallenge } from "../interfaces/IChallenge";
function ChallengeDetail({ onLoaded }, ref) {
  const router = useRouter();

  const [challenge, setChallenge]: [challenge: IChallenge, setChallenge: any] =
    useState(null);

  useImperativeHandle(
    ref,
    () => ({
      reload() {
        if (!router.isReady) return;
        getData(router.query.id);
      },
    }),
    [router.isReady]
  );

  useEffect(() => {
    if (!router.isReady) return;
    getData(router.query.id);
  }, [router.isReady]);

  const getData = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/challenges/${id}`, {}).then(
      (response) =>
        response.json().then((response) => {
          setChallenge(response.data);
          onLoaded(response.data);
        })
    );
  };

  let gradingStatus = null;
  switch (challenge?.gradingStatus) {
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
  return (
    <Card style={{ marginTop: "32px" }}>
      <Card.Header>
        <h4>Challenge Detail</h4>
      </Card.Header>
      <Card.Body>
        <div className="row">
          <div className="col-md-2 col-form-label">Challenge Name</div>
          <div className="col-md-10">
            <div className="form-control-plaintext">
              {challenge ? challenge?.name : "Loading..."}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-form-label">Student Name</div>
          <div className="col-md-10">
            <div className="form-control-plaintext">
              {challenge ? challenge?.student.name : "Loading..."}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-form-label">File</div>
          <div className="col-md-10">
            <div className="form-control-plaintext">
              <a href={challenge?.googleDriveFolder} target="blank">
                {challenge ? challenge?.googleDriveFolder : "Loading..."}
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-form-label">Status</div>
          <div className="col-md-10">
            <div className="form-control-plaintext">
              {challenge ? gradingStatus : "Loading..."}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default forwardRef(ChallengeDetail);
