const AppSuccess = ({
  res,
  msg = "A requisição foi finalizada com sucesso.",
  data = {},
  status = 200,
}) => {
  return res.status(status).send({ success: true, msg, data });
};

module.exports = AppSuccess;
