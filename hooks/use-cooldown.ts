import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "./use-local-storage";

interface UseCooldownProps {
    duration: number;
    storageKey?: string;
}

interface UseCooldownReturn {
    isInCooldown: boolean;
    remainingTime: number;
    startCooldown: () => void;
}

interface StoredCooldownData {
    endTime: number;
}

const MILLISECONDS_IN_SECOND = 1000;
const MIN_REMAINING_TIME = 0;

const calculateRemainingTime = (endTime: number): number => {
    const remaining = Math.ceil((endTime - Date.now()) / MILLISECONDS_IN_SECOND);
    return Math.max(remaining, MIN_REMAINING_TIME);
};

const useCooldown = ({
    duration,
    storageKey = 'cooldown'
}: UseCooldownProps): UseCooldownReturn => {
    const storage = useLocalStorage(storageKey);
    const [remainingTime, setRemainingTime] = useState<number>(MIN_REMAINING_TIME);

    // Initialize cooldown state from storage
    useEffect(() => {
        const storedData = storage.getItem() as StoredCooldownData | undefined;
        if (!storedData?.endTime) return;

        const remaining = calculateRemainingTime(storedData.endTime);
        if (remaining > MIN_REMAINING_TIME) {
            setRemainingTime(remaining);
        } else {
            storage.removeItem();
        }
    }, [storage]);

    // Handle cooldown start
    const startCooldown = useCallback(() => {
        const endTime = Date.now() + (duration * MILLISECONDS_IN_SECOND);
        storage.setItem({ endTime });
        setRemainingTime(duration);
    }, [duration, storage]);

    // Handle countdown timer
    useEffect(() => {
        const isInCooldown = remainingTime > MIN_REMAINING_TIME;
        if (!isInCooldown) {
            storage.removeItem();
            return;
        }

        const interval = setInterval(() => {
            setRemainingTime(time => {
                const newTime = time - 1;
                if (newTime <= MIN_REMAINING_TIME) {
                    storage.removeItem();
                }
                return Math.max(newTime, MIN_REMAINING_TIME);
            });
        }, MILLISECONDS_IN_SECOND);

        return () => clearInterval(interval);
    }, [remainingTime > MIN_REMAINING_TIME, storage]);

    return {
        isInCooldown: remainingTime > MIN_REMAINING_TIME,
        remainingTime,
        startCooldown
    };
};

export default useCooldown;