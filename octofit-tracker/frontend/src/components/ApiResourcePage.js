import React, { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

function normalizeResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.results)) {
    return data.results;
  }

  return [];
}

function getDisplayValue(item, keys) {
  for (const key of keys) {
    const value = item?.[key];
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
  }

  return 'N/A';
}

function renderCellContent(field, value) {
  if (typeof value !== 'string') {
    return value;
  }

  if (field.label === 'Email' && value.includes('@')) {
    return (
      <a className="link-primary text-decoration-none" href={`mailto:${value}`}>
        {value}
      </a>
    );
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return (
      <a className="link-primary text-decoration-none" href={value} target="_blank" rel="noreferrer">
        Open link
      </a>
    );
  }

  return value;
}

function ApiResourcePage({ title, endpoint, fields, emptyMessage }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const baseUrl = getApiBaseUrl();
    const apiEndpoint = `${baseUrl}/api/${endpoint}/`;

    console.log(`[${title}] API endpoint:`, apiEndpoint);

    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        console.log(`[${title}] fetched data:`, data);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        setItems(normalizeResponse(data));
        setError('');
      } catch (requestError) {
        console.error(`[${title}] fetch error:`, requestError);
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, title]);

  const filteredItems = items.filter((item) => {
    if (!query.trim()) {
      return true;
    }

    return fields.some((field) =>
      field.keys.some((key) => {
        const value = item?.[key];

        if (value === undefined || value === null) {
          return false;
        }

        return String(value).toLowerCase().includes(query.toLowerCase());
      })
    );
  });

  const detailRows = selectedItem
    ? fields.map((field) => ({
        label: field.label,
        value: getDisplayValue(selectedItem, field.keys),
      }))
    : [];

  return (
    <section className="api-resource-page">
      <div className="card border-0 shadow-sm mb-4 api-summary-card">
        <div className="card-body p-4">
          <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
            <div>
              <p className="text-uppercase text-primary fw-semibold small mb-2">REST Resource</p>
              <h1 className="h2 fw-bold mb-2">{title}</h1>
              <p className="text-body-secondary mb-0">
                Data from the Django REST API endpoint. The endpoint is logged to the console for each screen.
              </p>
            </div>
            <div className="d-flex flex-column align-items-start align-items-lg-end gap-2">
              <span className="badge text-bg-primary rounded-pill px-3 py-2">{filteredItems.length} visible</span>
              <span className="badge text-bg-light text-dark border rounded-pill px-3 py-2">{items.length} total</span>
            </div>
          </div>

          <div className="row g-3 mt-3 align-items-end">
            <div className="col-lg-8">
              <label className="form-label fw-semibold" htmlFor={`${endpoint}-search`}>
                Search records
              </label>
              <input
                id={`${endpoint}-search`}
                type="search"
                className="form-control form-control-lg"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-lg-4 d-flex gap-2 justify-content-lg-end">
              <button type="button" className="btn btn-primary btn-lg" onClick={() => window.location.reload()}>
                Refresh
              </button>
              <a
                className="btn btn-outline-secondary btn-lg"
                href={(() => {
                  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
                  if (codespaceName) {
                    return `https://${codespaceName}-8000.app.github.dev/api/${endpoint}/`;
                  }
                  return `http://localhost:8000/api/${endpoint}/`;
                })()}
                target="_blank"
                rel="noreferrer"
              >
                API link
              </a>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="alert alert-info d-flex align-items-center gap-2 mb-0" role="alert">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          <span>Loading {title.toLowerCase()}...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="alert alert-warning mb-0" role="alert">
          {query.trim() ? `No ${title.toLowerCase()} match your search.` : emptyMessage}
        </div>
      ) : (
        <div className="card border-0 shadow-sm overflow-hidden">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0 app-data-table">
              <thead className="table-dark">
                <tr>
                  {fields.map((field) => (
                    <th key={field.label} scope="col">
                      {field.label}
                    </th>
                  ))}
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id ?? `${endpoint}-${index}`}>
                    {fields.map((field) => {
                      const value = getDisplayValue(item, field.keys);

                      return (
                        <td key={field.label}>
                          <div className="fw-semibold">{renderCellContent(field, value)}</div>
                        </td>
                      );
                    })}
                    <td className="text-end">
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setSelectedItem(item)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedItem ? (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <div>
                    <h2 className="modal-title h5 mb-0">{title} details</h2>
                    <p className="text-body-secondary mb-0">Expanded record preview from the REST API.</p>
                  </div>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedItem(null)} />
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    {detailRows.map((row) => (
                      <div className="col-md-6" key={row.label}>
                        <div className="card h-100 border-0 bg-light">
                          <div className="card-body">
                            <div className="text-uppercase text-body-secondary small fw-semibold mb-1">{row.label}</div>
                            <div className="fw-semibold">{renderCellContent({ label: row.label }, row.value)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      ) : null}
    </section>
  );
}

export default ApiResourcePage;
