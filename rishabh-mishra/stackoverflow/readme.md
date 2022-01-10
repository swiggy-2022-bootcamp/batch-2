# Description:

The application serves as a platform for users to ask and answer questions, and, through membership
and active participation, to vote questions and answers up or down similar to Reddit/Stack overflow
and edit questions and answers.
Users of application can earn reputation points and "badges" for example, a person is awarded 10
reputation points for receiving an "up" vote on a question or an answer to a question, and can receive
badges for their valued contributions, which represents a gamification of the traditional Q&A website.
Users unlock new privileges with an increase in reputation like the ability to vote, comment, and even
edit other people's posts.

# Implementation:

## Entity:

- User:

  - id: id
  - name: string
  - email: string
  - password: string
  - reputation: integer
  - questions: [id]
  - answers: [id]
  - role: string
  - created_at: timestamp
  - updated_at: timestamp

- Question:

  - id: id
  - version :
    - title: string
    - body : string
    - user_id: id
  - vote:
    - user_id : integer
    - action : Boolean
  - answers: [id]
  - accepted_answer_id: id
  - created_at: timestamp
  - updated_at: timestamp

- Answer:

  - id: id
  - question_id: id
  - version:
    - body: string
    - user_id: id
  - vote:
    - user_id : integer
    - action : Boolean
  - created_at: timestamp
  - updated_at: timestamp

`Vote` will be extracted as a seprated schema and `Version` will be specialised schemas.

## Privilages:

Privileges are granted to users based on their reputation.

| Reputation | Privilages                               |
| ---------- | ---------------------------------------- |
| 0          | Ask Question or post Answer              |
| 15         | Upvote Question or Answer                |
| 125        | Downvote Question or Answer              |
| 2000       | Edit Others' Question or Answer Directly |

## Reputation Gains/Losses:

| Reputation | Action                                   |
| ---------- | ---------------------------------------- |
| +10        | Your Question/Answer is upvoted          |
| +15        | Your Answer is accepted (+2 to acceptor) |
| -2         | Your Question/Answer is downvoted        |
| -1         | You downvoted some Question/Answer       |

## References

- https://stackoverflow.com/help/whats-reputation
- https://stackoverflow.com/help/privileges
