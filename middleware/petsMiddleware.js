

// async function filterSearch(req, res, next) {
//     if (!req.query) {
//         res.status(400).send('Bad Request!')
//     }
//     const allQueries = req.query;
//     const allQueriesArray = Object.entries(allQueries);
//     const currentSearchQueries = allQueriesArray.filter(([key, value]) => value != '');
//     const searchQueriesObj = Object.fromEntries(currentSearchQueries);
//     req.body = searchQueriesObj;
//     next();
//     return;
// }



module.exports = { filterSearch }