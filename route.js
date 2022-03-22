import express from 'express';
import { db, bucket } from './db.js';
import UUID from 'uuid-v4';
import upload from './upload.js';
import fs from 'fs';

const router = express.Router();
let uuid = UUID();

router.get('/post', async (req, res) => {
  try {
    let post = [];
    let doc = await db.collection('posts').get();
    doc.forEach((val) => {
      post.push(val.data());
    });
    res.status(201).send(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// caption location time
router.post('/post', upload, async (req, res) => {
  try {
    // Uploads a local file to the bucket
    let date = Date.now();
    let id = uuid;
    let imageUrl = `https://storage.googleapis.com/download/storage/v1/b/instagram-clone-de7d7.appspot.com/o/${encodeURIComponent(
      req.file.filename
    )}?alt=media&token=${uuid}`;

    let uploaded = await bucket.upload(req.file.path, {
      uploadType: 'media',
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: id,
          contentType: req.file.mimetype,
        },
      },
    });

    let post = await db.collection('posts').doc(id).set({
      id,
      caption: req.body.caption,
      location: req.body.location,
      date,
      imageUrl,
    });
    fs.unlink('./' + req.file.path, (err) => {
      if (err) {
        throw Error(err);
      }
    });

    res.status(201).send({ success: post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
