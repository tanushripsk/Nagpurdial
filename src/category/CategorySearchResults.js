import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from 'react-bootstrap';
import './custom.css';
const CategorySearchResults = () => {
  const location = useLocation(); // Get the passed search results
  const { results } = location.state || {}; // Get results from location state

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // Number of results per page (updated to 10)

  if (!results || results.length === 0) {
    return <div className="alert alert-warning">No results found</div>;
  }

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container">
      {/* Loop through the results and display them */}
      <div className="row">
        {currentResults.map((item) => {
          // Get the first image from the list of image URLs
          const imageUrl = item.image_urls && item.image_urls[0];

          return (
            <div className="container" key={item.id}>
              <div className="beauty">
                <div className="col-md-12 mb-4">
                  <div className="d-flex shadow-sm border border-light rounded-3">
                    {/* Display a single image (the first one) */}
                    <div className="col-md-2 mx-4 mt-3">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="d-block w-60"
                          style={{
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          src="/path/to/default-image.jpg"
                          alt="Default"
                          className="d-block w-60"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      )}
                    </div>
<div className="col-md-1"></div>
                    {/* Item Content */}
                    <div className="col-md-9 d-flex flex-column justify-content-between p-3">
                      <div>
                        <h4 className="card-title" style={{ color: "green", fontWeight: "bold" }}>
                          {item.name}
                        </h4>
                        <p className="card-text">
                          <strong>Address:</strong> {item.address.street}, {item.address.city}
                        </p>

                        {/* Replace the phone number with WhatsApp button */}
                        <a
                          href={`https://wa.me/${item.phone_numbers[0]?.number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="success" className="mt-3">
                            <i className="fa fa-whatsapp" style={{ fontSize: "20px" }}></i>
                            &nbsp; Contact via WhatsApp
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {results.length > resultsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          {/* Previous Page Button */}
          <button
            className="btn btn-secondary mx-2"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Preview of Previous 3 Pages */}
          <div className="pagination-preview mx-2">
            {Array.from({ length: 3 }, (_, i) => currentPage - i - 1)
              .filter((pageNum) => pageNum >= 1)
              .map((pageNum) => (
                <button
                  key={pageNum}
                  className="btn btn-light mx-1"
                  onClick={() => changePage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
          </div>

          {/* Current Page Indicator */}
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>

          {/* Preview of Next 3 Pages */}
          <div className="pagination-preview mx-2">
            {Array.from({ length: 3 }, (_, i) => currentPage + i + 1)
              .filter((pageNum) => pageNum <= totalPages)
              .map((pageNum) => (
                <button
                  key={pageNum}
                  className="btn btn-light mx-1"
                  onClick={() => changePage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
          </div>

          {/* Next Page Button */}
          <button
            className="btn btn-secondary mx-2"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySearchResults;
