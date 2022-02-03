import { useEffect, useState } from 'react';
import Error from './components/Error/';
import Loading from './components/Loading/';
// import { FaAngleDoubleRight } from 'react-icons/fa';

function App() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [jobs, setJobs] = useState([]);
	const [value, setValue] = useState(0);

	const getJobs = async () => {
		try {
			setLoading(false);
			const res = await fetch('https://course-api.com/react-tabs-project');
			if (!res.ok) throw new Error(res.statusText);
			const jobs = await res.json();
			setJobs(jobs);
		} catch (err) {
			setLoading(false);
			setError("can't fetch data");
			console.log(err);
		}
	};
	useEffect(() => {
		getJobs();
	}, []);

	return (
		<>
			{loading && <Loading />}
			{error && <Error error={error} />}
			{jobs.length > 0 && jobs.map((job) => <h1 key={job.id}>{job.title}</h1>)}
		</>
	);
}

export default App;
