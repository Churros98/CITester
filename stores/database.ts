import Database from "@tauri-apps/plugin-sql";
import type { Frame } from "~/utils/probe";

export const useDatabaseStore = await defineStore('database', () => {
    let database: Database | undefined = undefined;

    const createChip = async (chip_name: string, frames: Frame[]) => 
        await database?.execute("INSERT INTO chips (name, frames) VALUES (?, ?)", [chip_name, JSON.stringify(frames)]);
      
    const updateChip = async (id: number, chip_name: string, frames: Frame[]) => 
        await database?.execute("UPDATE chips SET name = ?, frames = ? WHERE id = ?", [chip_name, JSON.stringify(frames), id]);
    
    const getChipData = async (id: number) => {
        if (!database) return undefined;
        
        const [result] = await database.select<{name: string, frames: string}[]>(
            "SELECT name, frames FROM chips WHERE id = ? LIMIT 1", 
            [id]
        );

        if (!result) return undefined;

        return {
            name: result.name,
            frames: JSON.parse(result.frames)
        };
    }

    const getChips = async () =>
        await database?.select<{id: number, name: string}[]>("SELECT id, name FROM chips");
    
    const deleteChip = async (id: number) => {
        await database?.execute("DELETE FROM chips WHERE id = ?", [id]);
    }

    Database.load("sqlite:citester.db").then((db) => {
        database = db;
    }).catch((error) => {
        console.error("Error loading database", error);
    });

    return {
        createChip,
        updateChip,
        getChipData,
        getChips,
        deleteChip
    };
});