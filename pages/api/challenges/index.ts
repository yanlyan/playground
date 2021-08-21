// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFileSync } from "fs";
import { join } from "path";
import { NextApiRequest, NextApiResponse } from "next";
import {
  IChallenge,
  IChallengePaginateParams,
} from "../../../interfaces/IChallenge";
import getConfig from "next/config";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const params = _validateParams(req, res);
  const data = _getData(params);
  res.status(200).json(data);
};

function _paginate(array: IChallenge[], page: number, size: number) {
  return array.slice((page - 1) * size, page * size);
}

function _validateParams(
  req: NextApiRequest,
  res: NextApiResponse
): IChallengePaginateParams {
  const { page, size } = req.query;
  const s: number = size ? parseInt(size.toString()) : 10;
  const p: number = page ? parseInt(page.toString()) : 1;

  if (isNaN(s) || isNaN(p)) {
    res.status(400).send("Bad Request");
  }
  return { page: p, size: s };
}

function _getData({ page, size }): IChallenge[] {
  const { serverRuntimeConfig } = getConfig();

  const path = join(
    serverRuntimeConfig.PROJECT_ROOT,
    "pages/api/data/challenges.json"
  );
  const data: IChallenge[] = JSON.parse(readFileSync(path, "utf-8"));

  return _paginate(data, page, size);
}
