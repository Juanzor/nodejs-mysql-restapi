import { pool } from '../db.js';

export const geEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};
export const getEmployee = async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ? ', [id]);
        if (rows.length <= 0) {
            res.status(404).json({
                message: 'Employee not found',
            });
        }
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};

export const createEmployees = async (req, res) => {
    const { name, salary } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary]);
        res.send({
            id: rows.insertId,
            name,
            salary,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};

export const updateEmployees = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;

    try {
        // Para que se actualizen datos parciales que entran por patch se usa IFNULL(?, campo)
        const [result] = await pool.query(
            'UPDATE employee set name = IFNULL(?, name) , salary = IFNULL(?, salary)  WHERE id = ?',
            [name, salary, id]
        );

        if (result.affectedRows <= 0) {
            res.status(404).json({ message: 'employee not found' });
        } else {
            //res.sendStatus(204);
            //Al realizar un put/patch, mysql no retorna el objeto actualizado, por lo tanto se hace un select a ese objeto
            const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);
            res.json(rows[0]);
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};

export const deleteEmployees = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [id]);

        if (result.affectedRows <= 0) {
            res.status(404).json({ message: 'employee not found' });
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
        });
    }
};
