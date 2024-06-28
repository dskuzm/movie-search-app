import React from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import useFetchData from '../hooks/useFetchData';

const HomePage: React.FC = () => {
    const {
        searchQuery,
        setSearchQuery,
        searchYear,
        setSearchYear,
        isLoading,
        error,
        movies,
        fetchMovies,
        totalPages,
    } = useFetchData();

    const handleSearch = () => {
        fetchMovies();
    };

    const handlePageChange = (page: number) => {
        console.log('page', page);
        fetchMovies(page);
    };

    return (
        <Container className="my-4">
            <h1>Movie Search App</h1>
            <Row className="mb-3">
                <Col xs={6}>
                    <Form.Control
                        type="text"
                        placeholder="Enter movie title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Col>
                <Col xs={3}>
                    <Form.Control
                        type="text"
                        placeholder="Enter year (optional)"
                        value={searchYear}
                        onChange={(e) => setSearchYear(e.target.value)}
                    />
                </Col>
                <Col xs={3}>
                    <Button variant="primary" onClick={handleSearch} disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Search'}
                    </Button>
                </Col>
            </Row>

            {error && <p className="text-danger">{error}</p>}

            {error === 'Maximum number of requests exceeded. Please refine your search criteria.' && (
                <p>Please provide more detailed information for a successful search.</p>
            )}

            <Row>
                {isLoading ? (
                    <Col className="d-flex justify-content-center my-4">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                ) : (
                    movies.map((movie) => (
                        <Col key={movie.imdbID} xs={12} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
                                <Card.Body>
                                    <Card.Title>{movie.Title} ({movie.Year})</Card.Title>
                                    <Card.Text>{movie.Plot}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            {totalPages > 1 && (
                <Row className="mt-3">
                    <Col>
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: Math.min(totalPages, 6) }, (_, index) => (
                                    <li key={index} className="page-item">
                                        <Button variant="link" className="page-link" onClick={() => handlePageChange(index + 1)}>
                                            {index + 1}
                                        </Button>
                                    </li>
                                ))}
                                {totalPages > 6 && (
                                    <li className="page-item disabled">
                                        <span className="page-link">...</span>
                                    </li>
                                )}
                                <li className="page-item disabled">
                                    <span className="page-link">{totalPages}</span>
                                </li>
                            </ul>
                        </nav>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default HomePage;
