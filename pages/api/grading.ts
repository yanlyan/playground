import type { NextApiRequest, NextApiResponse } from 'next'

// For centralised usage we would like to make grading
// aggregation rules available in a central places, as
// a service.
// http://localhost:3000/api/grading?grades=3&grades=4 -> agg === true
// http://localhost:3000/api/grading?grades=3&grades=5 -> agg === false
// http://localhost:3000/api/grading?grades=5 -> agg === false
// http://localhost:3000/api/grading?grades=1 -> agg === true

export default function evaluate( req: NextApiRequest, res) {
    const grades = req.query['grades'];
    if ( typeof(grades) === 'object') {
        const agg = grades
            .map( (it) => it !== "5") // 5 is failed
            .reduce((prev, cur) => cur && prev, true);
        res.status(200).json({agg});
    } else {
        res.status(200).json({agg: grades !== "5"});
    }
}