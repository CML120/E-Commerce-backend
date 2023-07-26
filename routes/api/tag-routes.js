const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  try {
    // Find all tags and include their associated Product data
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id` and include its associated Product data
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId, {
      include: [{ model: Product }],
    });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const tagId = req.params.id;
    const updatedTag = await Tag.update(req.body, {
      where: { id: tagId },
    });

    if (!updatedTag[0]) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its `id` value
    const tagId = req.params.id;
    const deletedTag = await Tag.destroy({
      where: { id: tagId },
    });

    if (!deletedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
