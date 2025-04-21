import { useNavigate } from "react-router-dom";
import { usePersonaDeckListContext } from "../../hooks/persona-deck/usePersonaDeckListContext";
import { PersonaDeck } from "../../types/personaDeck";

export default function DeckListPage() {
    const { decks, loading, addDeck, removeDeck } = usePersonaDeckListContext();
    const navigate = useNavigate();

    const handleAddDeck = () => {
        const newDeck: PersonaDeck = {
            id: `deck-${crypto.randomUUID()}`,
            customPersonaList: [],
        };
        addDeck(newDeck);
    };

    return (
        <main className="min-h-screen p-6 bg-gray-900 text-white">
            <section className="max-w-4xl mx-auto space-y-6">
                <header className="text-center">
                    <h1 className="text-3xl font-bold">🗂️ Persona Decks</h1>
                    <p className="text-gray-300 mt-2">Create and manage your persona decks.</p>
                </header>

                <div className="text-right">
                    <button
                        onClick={handleAddDeck}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                        ➕ <span>Add Deck</span>
                    </button>
                </div>

                {loading ? (
                    <p className="text-center text-gray-300">Loading decks...</p>
                ) : (
                    <ul className="space-y-4">
                        {decks.map((deck) => (
                            <li
                                key={deck.id}
                                className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-lg shadow"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold">Deck: {deck.id}</h2>
                                    <p className="text-sm text-gray-300">
                                        {deck.customPersonaList.length} persona(s)
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/decks/${deck.id}`)}
                                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-sm rounded"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => removeDeck(deck.id)}
                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-sm rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
