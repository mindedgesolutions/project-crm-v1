import { StatusCodes } from "http-status-codes";
import pool from "../../../db.js";
import { paginationLogic } from "../../utils/functions.js";
import { verifyJWT } from "../../utils/tokenUtils.js";

// ------
export const getCoListUsers = async (req, res) => {
  const { token_crm } = req.cookies;
  const { page, type, search } = req.query;
  const { uuid } = verifyJWT(token_crm);
  const user = await pool.query(
    `select id, company_id from users where uuid=$1`,
    [uuid]
  );

  const pagination = paginationLogic(page, null);

  let searchStr = "";

  searchStr = type ? searchStr + ` and rm.role='${type}'` : searchStr;
  searchStr = search
    ? searchStr +
      ` and (um.name ilike '%${search.trim()}%' or um.email ilike '%${search.trim()}%' or um.mobile ilike '%${search.trim()}%')`
    : searchStr;

  const data = await pool.query(
    `select um.*, rm.role from users um join roles rm on rm.id = um.role where um.id is not null ${searchStr} and um.company_id=$3 and um.id!=$4 order by um.name offset $1 limit $2`,
    [
      pagination.offset,
      pagination.pageLimit,
      user.rows[0].company_id,
      user.rows[0].id,
    ]
  );

  const records = await pool.query(
    `select um.*, rm.role from users um join roles rm on rm.id = um.role where um.id is not null ${searchStr} and um.company_id=$1 and um.id!=$2`,
    [user.rows[0].company_id, user.rows[0].id]
  );

  const totalPages = Math.ceil(records.rowCount / pagination.pageLimit);
  const meta = {
    totalPages: totalPages,
    currentPage: pagination.pageNo,
    totalRecords: records.rowCount,
  };

  res.status(StatusCodes.OK).json({ data, meta });
};
