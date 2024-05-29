"use client";
import { toast } from "sonner";

const ChallengeSolution = () => {
	return (
		<div>
			ChallengeSolution
			<button onClick={() => toast.success("My first toast")}>
				Give me a toast
			</button>
		</div>
	);
};

export default ChallengeSolution;
