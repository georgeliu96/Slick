export const fetchChannels = () => (
    $.ajax({
        method: "GET",
        url: "api/channels"
    })
);

export const fetchChannel = id => (
    $.ajax({
        method: "GET",
        url: `api/channels/${id}`
    })
);

export const createChannel = channel => (
    $.ajax({
        method: "POST",
        url: "api/channels",
        data: { channel }
    })
);

export const createDM = channel => (
    $.ajax({
        method: "POST",
        url: "api/dm_channels",
        data: { channel }
    })
);

export const deleteChannel = id => (
    $.ajax({
        method: "DELETE",
        url: `api/channels/${id}`
    })
);