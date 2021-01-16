import * as express from "express"
import * as pgPromise from "pg-promise"

export const register = (app: express.Application) => {
    const port = parseInt(process.env.PGPORT, 10)
    const config = {
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        port,
        user: process.env.PGUSER
    }

    const pgp = pgPromise()
    const db = pgp(config)

    /**
     * USERS
    */

    // read
    app.get(`/api/users`, async (req: any, res) => {
        const user_id = req.header('Authorization')
        if (!user_id) {
            return res.json({ error: "Not authorized" })
        }

        try {
            const query = await db.any(`SELECT * FROM csustom_user`)
            return res.json(query)
        } catch (err) {
            res.status(500)
            res.json({ error: err.message || err })
        }
    })

    // retrieve
    app.get(`/api/users/:id`, async (req: any, res) => {
        const user_id = req.header('Authorization')
        if (!user_id) {
            return res.json({ error: "Not authorized" })
        }

        try {
            const query = await db.any(`
                SELECT *
                FROM    custom_user
                WHERE   id = $[id]`,
                { id: req.params.id })
            
            if (query[0] == undefined) {
                res.status(404)
                res.json({ error: 'User not found' })  
            }
            return res.json(query[0])
        } catch (err) {
            res.status(500)
            res.json({ error: err.message || err })
        }
    })

    // create
    app.post(`/api/users`, async (req: any, res) => {
        const user_id = req.header('Authorization')
        if (!user_id) {
            return res.json({ error: "Not authorized" })
        }

        try {
            const id = await db.one(`
                INSERT INTO custom_user( name, surname )
                VALUES( $[name], $[surname])
                RETURNING id;`,
                { ...req.body })
            res.status(201)
            return res.json({ id })
        } catch (err) {
            res.status(500)
            res.json({ error: err.message || err })
        }
    })

    // update
    app.put(`/api/users/:id`, async (req: any, res) => {
        const user_id = req.header('Authorization')
        if (!user_id) {
            return res.json({ error: "Not authorized" })
        }

        try {
            const id = await db.one(`
                UPDATE custom_user
                SET name = $[name]
                    , surname = $[surname]
                WHERE
                    id = $[id]
                RETURNING
                    id;`,
                { id: req.params.id, ...req.body })
            return res.json({ id })
        } catch (err) {
            res.status(500)
            if (err.message === 'No data returned from the query.') {
                res.status(404)
            }
            res.json({ error: err.message || err })
        }
    })

    // destroy
    app.delete(`/api/users/:id`, async (req: any, res) => {
        const user_id = req.header('Authorization')
        if (!user_id) {
            return res.json({ error: "Not authorized" })
        }

        try {
            const id = await db.result(`
                DELETE
                FROM    custom_user
                WHERE   id = $[id]`,
                { id: req.params.id }, (r) => r.rowCount)
            res.status(204)
            return res.json({ users_deleted: id })
        } catch (err) {
            res.status(500)
            res.json({ error: err.message || err })
        }
    })

    /**
     * POSTS
    */

    // read
    app.get(`/api/posts`, async (req: any, res) => {
        const user_id = req.header('Authorization')
        if (!user_id) {
            return res.json({ error: "Not authorized" })
        }

        try {
            const query = await db.any(`SELECT * FROM post`)
            return res.json(query)
        } catch (err) {
            res.status(500)
            res.json({ error: err.message || err })
        }
    })

    // retrieve
    app.get(`/api/posts/:id`, async (req: any, res) => {
        const user_id = req.header('Authorization')
        if (!user_id) {
            return res.json({ error: "Not authorized" })
        }

        try {
            const query = await db.any(`
                SELECT *
                FROM    post
                WHERE   id = $[id]`,
                { id: req.params.id })
            
            if (query[0] == undefined) {
                res.status(404)
                res.json({ error: 'User not found' })  
            }
            return res.json(query[0])
        } catch (err) {
            res.status(500)
            res.json({ error: err.message || err })
        }
    })

    // create
    app.post(`/api/posts`, async (req: any, res) => {
        const user_id = req.header('Authorization')
        if (!user_id) {
            return res.json({ error: "Not authorized" })
        }

        try {
            const id = await db.one(`
                INSERT INTO post( title, content )
                VALUES( $[name], $[surname])
                RETURNING id;`,
                { ...req.body })
            res.status(201)
            return res.json({ id })
        } catch (err) {
            res.status(500)
            res.json({ error: err.message || err })
        }
    })

    // update
    app.put(`/api/posts/:id`, async (req: any, res) => {
        const user_id = req.header('Authorization')
        if (!user_id) {
            return res.json({ error: "Not authorized" })
        }

        try {
            const id = await db.one(`
                UPDATE post
                SET title = $[title]
                    , content = $[content]
                WHERE
                    id = $[id]
                RETURNING
                    id;`,
                { id: req.params.id, ...req.body })
            return res.json({ id })
        } catch (err) {
            res.status(500)
            if (err.message === 'No data returned from the query.') {
                res.status(404)
            }
            res.json({ error: err.message || err })
        }
    })

    // destroy
    app.delete(`/api/posts/:id`, async (req: any, res) => {
        const user_id = req.header('Authorization')
        if (!user_id) {
            return res.json({ error: "Not authorized" })
        }

        try {
            const id = await db.result(`
                DELETE
                FROM    post
                WHERE   id = $[id]`,
                { id: req.params.id }, (r) => r.rowCount)
            res.status(204)
            return res.json({ id })
        } catch (err) {
            res.status(500)
            res.json({ error: err.message || err })
        }
    })

    // get likes from
    app.get(`/api/posts/:id/likes`, async (req: any, res) => {
        const user_id = req.header('Authorization')
        if (!user_id) {
            return res.json({ error: "Not authorized" })
        }

        try {
            const query = await db.any(`
                SELECT count(*)
                FROM    like_post
                WHERE   post_id = $[id]`,
                { id: req.params.id })
            return res.json({ likes: query[0].count })
        } catch (err) {
            res.status(500)
            res.json({ error: err.message || err })
        }
    })

    /**
     * LIKE OR UNLIKE POST
    */
    app.post(`/api/like/:postid`, async (req: any, res) => {
        try {
            const user_id = req.header('Authorization')
            if (!user_id) {
                return res.json({ error: "Not authorized" })
            }

            const data = { post_id: req.params.postid, user_id }

            // check if exists like instance
            const query = await db.any(`
            SELECT *
            FROM    like_post
            WHERE   post_id = $[post_id]
            AND user_id = $[user_id]`, data)

            // like post
            if (query[0] == undefined) {
                console.log(data.post_id)
                const id = await db.one(`
                    INSERT INTO like_post( post_id, user_id )
                    VALUES( $[post_id], $[user_id])
                    RETURNING *;`, data)

                return res.json({ id })
            } else { // unlike post
                console.log(data)
                const id = await db.result(`
                    DELETE
                    FROM    like_post
                    WHERE   post_id = $[post_id]
                    AND user_id = $[user_id]`,
                    data, (r) => r.rowCount)
                res.status(204)
                return res.json({ elements_unliked: data.post_id })
            }
            return res.json(query)
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err)
            res.json({ error: err.message || err })
        }
    })
}