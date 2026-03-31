import { vi } from "vitest";

vi.stubGlobal('localStorage', {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
});

import { describe, expect } from "vitest";
import * as movieApi from "../../services/movies.api";
import configureStore from "redux-mock-store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import SearchResult from ".";


const mockSearchResults = {
    data: {
        results: [
            { id: 1, title: "Inception" },
            { id: 2, title: "Interstellar" },
        ],
    },
};

vi.spyOn(movieApi, "searchForMovie").mockResolvedValue(mockSearchResults);


const mockStore = configureStore([]);

describe("SearchResult Component", () => {

    test("show loader", () => {
        const store = mockStore({ loader: { loader: true }, favorite: { favorite: [] } })
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/search/inception"]}>
                    <Routes>
                        <Route path="/search/:query" element={<SearchResult />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        const loader = document.querySelector('.loader');
        expect(loader).toBeInTheDocument();
    })

    test("show result", async () => {
        const store = mockStore({ loader: { loader: false }, favorite:{favorite:[]} })

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/search/inception"]}>
                    <Routes>
                        <Route path="/search/:query" element={<SearchResult />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        const firstMovie = await screen.findByText(/Inception/i);
        const secondMovie = await screen.findByText(/Interstellar/i);

        expect(firstMovie).toBeInTheDocument()
        expect(secondMovie).toBeInTheDocument()


    })

})