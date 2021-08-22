import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { Student } from "../../../database/entities/Student";
import { IStudent } from "../../../interfaces/IStudent";
import { IChallenge } from "../../../interfaces/IChallenge";
import ChallengeDetail from "../../../components/challenge-detail";

export default function ChallengeAssign() {
  const router = useRouter();
  const [challenge, setChallenge]: [challenge: IChallenge, setChallenge: any] =
    useState(null);
  const [students, setStudents]: [students: Student[], setStudents: any] =
    useState([]);
  const [form, setForm]: [form: { reviewer?: any }, setForm: any] = useState(
    {}
  );
  const [errors, setErrors]: [errors: { reviewer?: any }, setErrors: any] =
    useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!challenge) return;
    getStudents(challenge.student.id);
  }, [challenge]);

  const getStudents = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students/${id}`, {}).then(
      (response) =>
        response.json().then((response) => {
          setStudents(response.data);
        })
    );
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
    const { reviewer } = form;
    const newErrors: { reviewer?: string } = {};
    if (!reviewer || reviewer === "")
      newErrors.reviewer = "Reviewer must be selected!";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      assign(form.reviewer);
    }
  };

  const assign = (id) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/challenges/${router.query.id}/assign`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewerId: id,
        }),
      }
    ).then((response) => {
      setLoading(false);
      if (response.ok) {
        setSuccess(true);
      } else {
        setError({
          message: response.statusText,
        });
      }
    });
  };

  const back = (e) => {
    e.preventDefault();
    router.push("/challenges");
  };

  const onChallengeLoaded = (c) => {
    setChallenge(c);
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
        Challenge Assignment Success!{" "}
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

      <ChallengeDetail onLoaded={onChallengeLoaded}></ChallengeDetail>
      <Card style={{ marginTop: "32px" }}>
        <Card.Header>
          <h4>Assign Reviewer</h4>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Reviewer
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  required
                  aria-label="Floating label select example"
                  onChange={(e) =>
                    setField("reviewer", (e.target as HTMLSelectElement).value)
                  }
                  isInvalid={!!errors.reviewer}
                >
                  <option value="">Select a reviewer</option>
                  {students.map((student: IStudent) => {
                    return (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.reviewer}
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
                  disabled={loading || challenge === null}
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
