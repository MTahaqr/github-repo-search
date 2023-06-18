import { Octokit } from '@octokit/rest'
import { buildApiQueryHook } from './api'
const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN })

export interface Repo {
  id: number
  name: string
  full_name: string
  description: string | null
  stargazers_count: number | undefined
  created_at: string
  owner?: {
    name?: string | null | undefined
    email?: string | null | undefined
    login: string
    id?: number
    node_id?: string
    avatar_url?: string
    gravatar_id?: string | null
    url?: string
    html_url?: string
    starred_at?: string | undefined
  } | null
}

export interface RepoList {
  items: Repo[]
  total_count: number
}

interface useToGetGithubReposParams {
  perPage: number
  pageNum: number
  searchTerm: string
}

export const getGithubRepos = ({
  searchTerm,
  perPage,
  pageNum,
}: {
  searchTerm: string
  perPage: number
  pageNum: number
}) =>
  octokit.request('GET /search/repositories', {
    q: `${searchTerm}`,
    page: pageNum,
    /* eslint-disable-next-line */
    per_page: perPage,
  })

export const useToGetGithubRepos = buildApiQueryHook<useToGetGithubReposParams, RepoList>(
  (params) => ['getGithubRepos', params],
  (params) => getGithubRepos({ ...params }),
)
