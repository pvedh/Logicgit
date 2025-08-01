const express = require('express');
const router = express.Router();
const { fetchCommits, fetchIssues, fetchPullRequests } = require('../services/githubService');

// Get commits
router.get('/:repoName/commits', async (req, res) => {
  const { repoName } = req.params;
  try {
    const commits = await fetchCommits(repoName);
    res.status(200).json(commits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get issues
router.get('/:repoName/issues', async (req, res) => {
  const { repoName } = req.params;
  try {
    const issues = await fetchIssues(repoName);
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get pull requests
router.get('/:repoName/pull-requests', async (req, res) => {
  const { repoName } = req.params;
  try {
    const pullRequests = await fetchPullRequests(repoName);
    res.status(200).json(pullRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;