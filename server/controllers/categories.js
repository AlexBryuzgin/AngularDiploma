import db from './../utils/db';

export function getAllDirectChildrenCategories(req, res) {
  db.category.findAll({
    where: {
      parent_category_id: req.params.id,
    }
  })
    .then(categories => res.send(categories))
    .catch(err => res.send({
      success: false,
      ...err
    }))
}

export function createCategory(req, res) {
  db.category.create({
    parent_category_id: req.body.parent,
    title: req.body.title,
  })
    .then(category => res.send(category))
    .catch(err => res.send({
      success: false,
      ...err
    }))
}