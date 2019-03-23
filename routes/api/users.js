const express = require("express");
const fetch = require("isomorphic-fetch");
const router = express.Router();
const { API_KEY, BASE_URL } = require("../../config/keys");

// @route   GET api/users
// @access  Public
router.get("/", async (req, res) => {
  const { user } = req.query;
  const url = `${BASE_URL}users/?q=${user}&client_id=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const flattenData = data.users.reduce(
      (acc, { id, first_name, last_name, username }) => {
        acc.push({
          id,
          firstName: first_name,
          lastName: last_name,
          username
        });
        return acc;
      },
      []
    );
    res.send(flattenData);
  } catch (e) {
    throw new Error(e);
  }
});

// @route   GET api/users/:username
// @access  Public
router.get("/:username", async (req, res) => {
  const userName = req.params.username;
  const behanceUrl = `${BASE_URL}users/${userName}/?client_id=${API_KEY}`;

  try {
    const response = await fetch(behanceUrl);
    const {
      user: {
        first_name,
        last_name,
        username,
        city,
        country,
        occupation,
        url,
        images,
        stats,
        website,
        sections
      }
    } = await response.json();
    return res.status !== 404
      ? res.send({
          first_name,
          last_name,
          username,
          city,
          country,
          occupation,
          url,
          images,
          stats,
          website,
          sections
        })
      : res.send({});
  } catch (e) {
    throw new Error(e);
  }
});

// @route   GET api/users/:username/projects
// @access  Public
router.get("/:username/projects", async (req, res) => {
  const userName = req.params.username;
  const url = `${BASE_URL}users/${userName}/projects/?client_id=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const flattenData = data.projects.reduce(
      (
        acc,
        { id, name, url, covers, published_on, created_on, modified_on }
      ) => {
        acc.push({
          id,
          name,
          url,
          covers,
          published_on,
          created_on,
          modified_on
        });
        return acc;
      },
      []
    );
    return res.status !== 404 ? res.send(flattenData) : res.send([]);
  } catch (e) {
    throw new Error(e);
  }
});

// @route   GET api/users/:username/followers
// @access  Public
router.get("/:username/followers", async (req, res) => {
  const userName = req.params.username;
  const url = `${BASE_URL}users/${userName}/followers/?client_id=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const flattenData = data.followers.reduce(
      (acc, { id, username, images }) => {
        acc.push({
          id,
          username,
          images
        });
        return acc;
      },
      []
    );
    return res.status !== 404 ? res.send(flattenData) : res.send([]);
  } catch (e) {
    throw new Error(e);
  }
});

// @route   GET api/users/:username/followers
// @access  Public
router.get("/:username/following", async (req, res) => {
  const userName = req.params.username;
  const url = `${BASE_URL}users/${userName}/following/?client_id=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const flattenData = data.following.reduce(
      (acc, { id, username, images }) => {
        acc.push({
          id,
          username,
          images
        });
        return acc;
      },
      []
    );
    return res.status !== 404 ? res.send(flattenData) : res.send([]);
  } catch (e) {
    throw new Error(e);
  }
});

// @route   GET api/users/:username/workExperience
// @access  Public
router.get("/:username/workExperience", async (req, res) => {
  const userName = req.params.username;
  const url = `${BASE_URL}users/${userName}/work_experience/?client_id=${API_KEY}`;
  try {
    const response = await fetch(url);
    const { work_experience } = await response.json();
    if (response.status === 404) {
      res.status(404).send([]);
    } else {
      res.send(work_experience);
    }
  } catch (e) {
    throw new Error(e);
  }
});
module.exports = router;
