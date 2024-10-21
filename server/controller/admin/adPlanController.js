import { StatusCodes } from "http-status-codes";
import pool from "../../../db.js";
import slug from "slug";
import dayjs from "dayjs";
import { paginationLogic } from "../../utils/functions.js";

// ------
export const getListPlanAttributes = async (req, res) => {
  const { page } = req.query;
  const pagination = paginationLogic(page, null);

  const data = await pool.query(
    `select * from plan_attributes order by attribute offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(`select * from plan_attributes`, []);

  const totalPages = Math.ceil(records.rowCount / pagination.pageLimit);
  const meta = {
    totalPages: totalPages,
    currentPage: pagination.pageNo,
    totalRecords: records.rowCount,
  };

  res.status(StatusCodes.OK).json({ data, meta });
};

// ------
export const getAllPlanAttributes = async (req, res) => {
  const data = await pool.query(
    `select id, attribute, type, name from plan_attributes order by attribute`,
    []
  );

  res.status(StatusCodes.OK).json({ data });
};

// ------
export const addPlanAttribute = async (req, res) => {
  const { attribute, type } = req.body;
  const attrSlug = slug(attribute);
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  try {
    await pool.query(`BEGIN`);

    const data = await pool.query(
      `insert into plan_attributes(attribute, type, created_at, updated_at, slug) values($1, $2, $3, $4, $5) returning id`,
      [attribute.trim(), type, timeStamp, timeStamp, attrSlug]
    );

    const id = data.rows[0].id;
    const slugArr = attrSlug.split("-");
    let name = "";
    slugArr.forEach((element) => {
      name += element.substring(0, 1);
    });
    name = `${name}_${id}`;

    await pool.query(`update plan_attributes set name=$1 where id=$2`, [
      name,
      id,
    ]);

    await pool.query(`COMMIT`);
    res.status(StatusCodes.CREATED).json(`success`);
  } catch (error) {
    await pool.query(`ROLLBACK`);
    console.log(error);
    return error;
  }
};

// ------
export const editPlanAttribute = async (req, res) => {
  const { attribute, type } = req.body;
  const { id } = req.params;
  const attrSlug = slug(attribute);
  const timeStamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

  try {
    await pool.query(`BEGIN`);

    await pool.query(
      `update plan_attributes set attribute=$1, type=$2, updated_at=$3, slug=$4 where id=$5`,
      [attribute.trim(), type, timeStamp, attrSlug, id]
    );

    const slugArr = attrSlug.split("-");
    let name = "";
    slugArr.forEach((element) => {
      name += element.substring(0, 1);
    });
    name = `${name}_${id}`;

    await pool.query(`update plan_attributes set name=$1 where id=$2`, [
      name,
      id,
    ]);

    await pool.query(`COMMIT`);
    res.status(StatusCodes.ACCEPTED).json(`success`);
  } catch (error) {
    await pool.query(`ROLLBACK`);
    console.log(error);
    return error;
  }
};

// ------
export const deleteListPlanAttribute = async (req, res) => {
  const { id } = req.params;

  await pool.query(`update plan_attributes set is_active=false where id=$1`, [
    id,
  ]);

  res.status(StatusCodes.NO_CONTENT).json(`success`);
};

// ------
export const activatePlanAttribute = async (req, res) => {
  const { id } = req.params;

  await pool.query(`update plan_attributes set is_active=true where id=$1`, [
    id,
  ]);

  res.status(StatusCodes.NO_CONTENT).json(`success`);
};

// ------
export const getListPlans = async (req, res) => {
  const { page } = req.query;
  const pagination = paginationLogic(page, null);

  const data = await pool.query(
    `select id, name, price, tenure, slug, id, updated_at from plans order by name offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(`select * from plans`, []);

  const totalPages = Math.ceil(records.rowCount / pagination.pageLimit);
  const meta = {
    totalPages: totalPages,
    currentPage: pagination.pageNo,
    totalRecords: records.rowCount,
  };

  res.status(StatusCodes.OK).json({ data, meta });
};
