import React, { useEffect, useState } from "react";

interface TableData {
  name: string;
  age: number;
  job: string;
  score: number;
}

interface Formdata {
  name: string;
  minScore: number;
  maxScore: number;
}

const TableComponent: React.FC = () => {
  const [rows, setRows] = useState<TableData[]>([
    { name: "", age: 0, job: "", score: 0 },
  ]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [formdata, setFormData] = useState<Formdata>({
    name: "",
    minScore: 0,
    maxScore: 0,
  });
  const [displayedRows, setDisplayedRows] = useState<TableData[]>(rows);
  const [afterfilter, setAfterFilter] = useState<TableData[]>(rows);

  const applyFilters = () => {
    setAfterFilter(rows);
    const filtered = filterRows();
    setDisplayedRows(filtered);
  };

  function resetRows() {
    if (count < 2) {
      setRows(afterfilter);
      count++;
    }
  }
  var count = 1;

  useEffect(() => {
    count++;
    setRows(displayedRows);
  }, [displayedRows]);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof TableData
  ) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: e.target.value } : row
    );
    setRows(updatedRows);
  };

  const addData = () => {
    setRows([...rows, { name: "", age: 0, job: "", score: 0 }]);
  };

  const deleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const startEditing = (index: number) => {
    setEditingRow(index);
  };

  const stopEditing = () => {
    setEditingRow(null);
  };

  function filteredData() {
    setShowFilterForm(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  function closeForm() {
    setShowFilterForm(false);
  }
  const filterRows = () => {
    const { name, minScore, maxScore } = formdata;

    return rows.filter((row) => {
      const nameMatches = name ? row.name.includes(name) : true;

      const scoreInRange = row.score >= minScore && row.score <= maxScore;

      return nameMatches && scoreInRange;
    });
  };

  return (
    <div>
      <div>
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Job</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    required
                    placeholder="name"
                    value={row.name}
                    onChange={(e) => inputHandler(e, index, "name")}
                    disabled={editingRow !== index}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    required
                    placeholder="age"
                    value={row.age}
                    onChange={(e) => inputHandler(e, index, "age")}
                    disabled={editingRow !== index}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    required
                    placeholder="job"
                    value={row.job}
                    onChange={(e) => inputHandler(e, index, "job")}
                    disabled={editingRow !== index}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    required
                    placeholder="score"
                    value={row.score}
                    onChange={(e) => inputHandler(e, index, "score")}
                    disabled={editingRow !== index}
                  />
                </td>
                <td>
                  <span>
                    {editingRow === index ? (
                      <button onClick={stopEditing}>Save</button>
                    ) : (
                      <button onClick={() => startEditing(index)}>Edit</button>
                    )}
                  </span>
                  <span>
                    <button onClick={() => deleteRow(index)}>Delete</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addData}>Add</button>
        <br></br>
      </div>
      <div>
        <center>
          <button
            onClick={() => {
              filteredData();
            }}
          >
            Filter
          </button>
          <br></br>
          <div>
            {showFilterForm === true && (
              <div>
                <form>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="name"
                    value={formdata.name}
                    onChange={handleChange}
                  />
                  <br />
                  <br></br>

                  <label htmlFor="minScore">MinScore</label>
                  <input
                    type="number"
                    id="minScore"
                    placeholder="minScore"
                    value={formdata.minScore}
                    onChange={handleChange}
                  />
                  <br></br>
                  <br></br>

                  <label htmlFor="maxScore">MaxScore</label>
                  <input
                    type="number"
                    id="maxScore"
                    placeholder="maxScore"
                    value={formdata.maxScore}
                    onChange={handleChange}
                  />
                </form>
                <br></br>
                <button onClick={applyFilters}>Check</button>

                <button
                  onClick={() => {
                    setFormData({ name: "", maxScore: 0, minScore: 0 });
                    resetRows();
                  }}
                >
                  Reset
                </button>
                <br></br>
                <br></br>
                <button
                  onClick={() => {
                    resetRows();
                    closeForm();
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </center>
      </div>
    </div>
  );
};

export default TableComponent;
