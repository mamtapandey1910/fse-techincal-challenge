// TODO: implement the main page
// This page should:
// 1. Fetch the list of subjects from GET /articles on load
// 2. Render <AnalysisForm /> with the subject list as dropdown options
// 3. When a subject is selected, fetch the article from GET /articles/{id}
//    and populate the form
// 4. On form submit, call POST /analyse/{id} and pass the result to
//    <AnalysisResult />
// 5. Handle loading and error states

export default function Home() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <p className="text-muted-foreground text-sm">
        TODO: implement Home page — see comments above
      </p>
    </main>
  );
}
