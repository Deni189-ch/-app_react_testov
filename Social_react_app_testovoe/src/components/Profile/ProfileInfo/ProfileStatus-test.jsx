import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="testing-status" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("testing-status");
    });

    test("after creation span with status should be displayed with correct status ", () => {
        const component = create(<ProfileStatus status="testing-status" />);
        const root = component.root;
        let span  = root.findByType("span")
        expect(span.length).not.toBeNull();
    });

    test("after creation span with status should be displayed with correct status ", () => {
        const component = create(<ProfileStatus status="testing-status" />);
        const root = component.root;
        let span  = root.findByType("span")
        expect(span.innerText).toBe("testing-status");
    });

    test("after inputshouldn't be displayed ", () => {
        const component = create(<ProfileStatus status="testing-status" />);
        const root = component.root;
        let span  = root.findByType("input")
        expect(span).toBeNull();
    });
});