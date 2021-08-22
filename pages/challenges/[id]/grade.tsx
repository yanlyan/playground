import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { Card, Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import ChallengeDetail from "../../../components/challenge-detail";
import { IChallenge } from "../../../interfaces/IChallenge";

export default function ChallengeGrade() {
  const router = useRouter();
  const [challenge, setChallenge]: [challenge: IChallenge, setChallenge: any] =
    useState(null);
  const [errors, setErrors]: [errors: { grade?: any }, setErrors: any] =
    useState({});
  const [form, setForm]: [form: { grade?: any }, setForm: any] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const detailRef: any = useRef();

  const options = [];
  for (let i = 1; i <= 5; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      setGrade(form.grade);
    }
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { grade } = form;
    const newErrors: { grade?: string } = {};
    if (!grade || grade === "") newErrors.grade = "Grade must be selected!";

    return newErrors;
  };

  const back = (e) => {
    e.preventDefault();
    router.push("/challenges");
  };
  const onChallengeLoaded = (c) => {
    setChallenge(c);
    console.log(c.grade);
    setField("grade", c.grade);
  };

  const setGrade = (grade) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/challenges/${router.query.id}/grade`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grade: grade,
        }),
      }
    ).then((response) => {
      setLoading(false);
      if (response.ok) {
        setSuccess(true);
        if (detailRef && detailRef.current) {
          detailRef.current.reload();
        }
      } else {
        setError({
          message: response.statusText,
        });
      }
    });
  };

  return (
    <div className="container">
      <Alert
        hidden={!success}
        variant="success"
        style={{ marginTop: "32px" }}
        dismissible
        onClose={() => setSuccess(false)}
      >
        Set Grade Success!{" "}
        <a href="/challenges" onClick={back}>
          Back to Challenges
        </a>
      </Alert>
      <Alert
        hidden={!error}
        variant="danger"
        style={{ marginTop: "32px" }}
        dismissible
        onClose={() => setError(null)}
      >
        {error?.message}
      </Alert>
      <ChallengeDetail
        ref={detailRef}
        onLoaded={onChallengeLoaded}
      ></ChallengeDetail>
      <Card style={{ marginTop: "32px" }}>
        <Card.Header>
          <h4>Set Grade</h4>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Grade
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  required
                  aria-label="Floating label select example"
                  value={form.grade || ""}
                  onChange={(e) =>
                    setField("grade", (e.target as HTMLSelectElement).value)
                  }
                  isInvalid={!!errors.grade}
                >
                  <option value="">Select a grade</option>
                  {options}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.grade}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <div className="row">
              <div className="col-sm-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={back}
                >
                  Cancel
                </Button>
              </div>

              <div className="col-sm-10">
                <Button
                  type="submit"
                  size="sm"
                  disabled={
                    loading ||
                    challenge === null ||
                    challenge?.gradingStatus !== "SUBMITTED"
                  }
                >
                  Save
                </Button>
                <Spinner
                  hidden={!loading}
                  style={{ marginLeft: "8px" }}
                  animation="border"
                  size="sm"
                ></Spinner>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
