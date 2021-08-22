import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import ChallengeRow from "../../components/challenge-row";
import MyPagination from "../../components/pagination";
import { IChallenge } from "../../interfaces/IChallenge";

export default function Challenges() {
  const [challengeList, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);

  useEffect(() => {
    afterPageClicked(1);
  }, []);

  const afterPageClicked = (page) => {
    setCurrentPage(page);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/challenges?${new URLSearchParams({
        page: page.toString(),
        size: "10",
      })}`,
      {}
    )
      .then((response) => response.json())
      .then((data) => {
        data.data = data.data.map((d, i) => {
          d.index = (page - 1) * 10 + i + 1;
          return d;
        });
        setChallenges(data.data);
        setTotalPage(data.pagination.total / data.pagination.size);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="col">Challenges</h1>
      </div>
      <div className="row">
        <Table striped responsive bordered hover>
          <thead>
            <tr>
              <th className="text-center">No.</th>
              <th>Name</th>
              <th>Student</th>
              <th className="text-center">Grading Status</th>
              <th className="text-center">Grade</th>
              <th>Reviewer</th>
            </tr>
          </thead>
          <tbody>
            {challengeList.map((challenge: IChallenge) => {
              return <ChallengeRow key={challenge.id} challenge={challenge} />;
            })}
          </tbody>
        </Table>
      </div>

      <div className="row">
        <div className="col">
          <MyPagination
            totPages={totalPage}
            currentPage={currentPage}
            pageClicked={(ele) => {
              afterPageClicked(ele);
            }}
          ></MyPagination>
        </div>
      </div>
    </div>
  );
}
