import { useState } from "react";

const Registration = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        alert(`Registered: ${form.name} (${form.email})`);
        setForm({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <section className="section">
            <div className="section-center" style={{ maxWidth: "600px" }}>
                <h2 style={{ marginBottom: "1rem" }}>Registration</h2>

                {error && (
                    <p style={{ marginBottom: "1rem", color: "crimson" }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="form-row">
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="phone">Phone</label>
                        <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn" style={{ marginTop: "1rem" }}>
                        Register
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Registration;