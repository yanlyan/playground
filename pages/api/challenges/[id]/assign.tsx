import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Challenge } from "../../../../entities/Challenge";
import initializeDatabase from "../../../../initializers/database";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    _validateBody(req, res);
    const connection = await initializeDatabase();
    try {
      await _updateData(res, {
        challengeId: req.query.id,
        reviewerId: req.body.reviewerId,
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
  if (!req.body.reviewerId || !req.query.id) {
    return res.status(400).json({ message: "Bad Request" });
  }
}

function _validateData(
  res,
  {
    challenge,
    reviewerId,
  }: {
    challenge: Challenge;
    reviewerId: number;
  }
) {
  if (challenge.studentId === reviewerId) {
    return res.status(400).json({
      message: "Bad Request. Cannot assign to the author of challenge",
    });
  }
}

async function _updateData(res, { challengeId, reviewerId }): Promise<void> {
  const challengeRepo = await getRepository(Challenge);
  console.log(challengeId);
  const challenge = await challengeRepo.findOne(challengeId);
  _validateData(res, { challenge, reviewerId });
  challenge.reviewerId = reviewerId;
  await challengeRepo.save(challenge);
}
