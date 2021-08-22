import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Challenge } from "../../../../database/entities/Challenge";
import initializeDatabase from "../../../../database/init";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    _validateBody(req, res);
    const connection = await initializeDatabase();
    try {
      await _updateData({
        challengeId: req.query.id,
        grade: req.body.grade,
      });
      return res.status(200).json({ message: "Updated Succesfully!" });
    } catch (error) {
      await connection.close();
      return res.status(500).json({ message: error.toString() });
    }
  }

  return res.status(404).json({ message: "Route not found" });
};

function _validateBody(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.grade || !req.query.id) {
    return res.status(400).json({ message: "Bad Request" });
  }
}

async function _updateData({ challengeId, grade }): Promise<void> {
  const challengeRepo = await getRepository(Challenge);
  const challenge = await challengeRepo.findOne(challengeId);
  challenge.grade = grade;
  if (grade <= 4 && grade >= 1) {
    challenge.gradingStatus = "GRADE_PASSED";
  } else {
    challenge.gradingStatus = "GRADE_FAILED";
  }
  await challengeRepo.save(challenge);
}
